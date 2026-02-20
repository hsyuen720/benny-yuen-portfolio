---
name: testing-patterns
description: Jest and React Testing Library patterns for this portfolio project. Use this skill when writing, reviewing, or fixing tests for components, hooks, contexts, utilities, or settings. Covers test structure, mocking strategies, and coverage requirements.
---

# Testing Patterns

Guidelines for testing this portfolio project with Jest and React Testing Library.

## Setup

- **Runner:** Jest with `jest-environment-jsdom`
- **Testing Library:** `@testing-library/react`, `@testing-library/user-event`
- **Config:** `jest.config.ts` + `jest.setup.ts`
- **Test location:** `src/__tests__/` mirrors the `src/` directory structure

---

## 1. Test File Structure

```
src/__tests__/
├── components/       ← UI component tests
│   ├── button.test.tsx
│   └── ...
├── contexts/         ← React context tests
│   └── home.test.tsx
├── hooks/            ← Custom hook tests
│   ├── useInView.test.ts
│   └── useOutsideClick.test.ts
├── settings/         ← Constants and i18n tests
│   ├── constants.test.ts
│   └── i18n.test.ts
├── types/            ← Type utility tests
│   └── common.test.tsx
└── utils/            ← Utility function tests
    └── getFormat.test.ts
```

Match the path: a test for `src/components/button/index.tsx` lives at `src/__tests__/components/button.test.tsx`.

---

## 2. Component Tests

### Basic Render Test
```tsx
import { render, screen } from "@testing-library/react";
import Button from "~/components/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### Testing Props
```tsx
it("applies className prop", () => {
  const { container } = render(<Button className="custom">Text</Button>);
  expect(container.firstChild).toHaveClass("custom");
});
```

### Testing User Interactions
```tsx
import userEvent from "@testing-library/user-event";

it("calls onClick when clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Click</Button>);
  await user.click(screen.getByRole("button"));
  expect(onClick).toHaveBeenCalledTimes(1);
});
```

---

## 3. Hook Tests

Use `renderHook` from `@testing-library/react`:

```ts
import { renderHook, act } from "@testing-library/react";
import useOutsideClick from "~/hooks/useOutsideClick";

describe("useOutsideClick", () => {
  it("calls callback when clicking outside", () => {
    const callback = jest.fn();
    const ref = { current: document.createElement("div") };
    document.body.appendChild(ref.current);

    renderHook(() => useOutsideClick(ref, callback));

    act(() => {
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
    document.body.removeChild(ref.current);
  });
});
```

---

## 4. Context Tests

Wrap components in the necessary providers:

```tsx
import { render } from "@testing-library/react";
import HomeProvider from "~/contexts/home/provider";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <HomeProvider>{children}</HomeProvider>
);

render(<ComponentUnderTest />, { wrapper });
```

---

## 5. Module Aliases

All `~/*` path aliases resolve correctly in tests via `jest.config.ts` `moduleNameMapper`:

```ts
"^~/components/(.*)$": "<rootDir>/src/components/$1",
"^~/contexts/(.*)$":   "<rootDir>/src/contexts/$1",
"^~/hooks/(.*)$":      "<rootDir>/src/hooks/$1",
"^~/modules/(.*)$":    "<rootDir>/src/modules/$1",
"^~/settings/(.*)$":   "<rootDir>/src/settings/$1",
"^~/styles/(.*)$":     "<rootDir>/src/styles/$1",
"^~/types/(.*)$":      "<rootDir>/src/types/$1",
"^~/utils/(.*)$":      "<rootDir>/src/utils/$1",
```

---

## 6. Mocking

### Vanilla Extract CSS
CSS module files are automatically mocked via `identity-obj-proxy`. Class names return their key names. Do not test for specific CSS class values.

### React Icons
Mocked via `__mocks__/react-icons.ts`. Icon components render as simple elements — test by role or aria-label, not by icon name.

### Firebase Utilities
```ts
jest.mock("~/utils/getCollection", () => jest.fn().mockResolvedValue([]));
jest.mock("~/utils/getDocument", () => jest.fn().mockResolvedValue(null));
jest.mock("~/utils/firebase", () => ({
  db: {},
  storage: {},
  app: {},
}));
```

### `next/navigation`
```ts
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
```

### `next-intl`
```ts
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
```

---

## 7. Running Tests

```bash
# Run all tests
npx jest

# Run with coverage
npx jest --coverage

# Run a specific file
npx jest src/__tests__/components/button.test.tsx

# Run in watch mode
npx jest --watch
```

Coverage reports are generated in `coverage/lcov-report/index.html`.

---

## 8. Coverage Requirements

Collect coverage from:
```ts
collectCoverageFrom: [
  "src/**/*.{js,jsx,ts,tsx}",
  "!src/**/*.d.ts",
  "!src/**/*.stories.{js,jsx,ts,tsx}",
  "!src/**/__tests__/**",
]
```

When adding new utility functions, components, hooks, or contexts, always add a corresponding test file.

---

## 9. Common Patterns Reference

### Testing Snapshot (use sparingly)
```tsx
it("matches snapshot", () => {
  const { container } = render(<Component />);
  expect(container).toMatchSnapshot();
});
```

### Testing Async Components
```tsx
import { waitFor } from "@testing-library/react";

it("loads and displays data", async () => {
  render(<AsyncComponent />);
  await waitFor(() => {
    expect(screen.getByText("Loaded content")).toBeInTheDocument();
  });
});
```

### Testing with i18n
Wrap with `NextIntlClientProvider` for components using `useTranslations`:

```tsx
import { NextIntlClientProvider } from "next-intl";

const messages = { portfolio: { button: { label: "Click" } } };

render(
  <NextIntlClientProvider locale="en" messages={messages}>
    <MyComponent />
  </NextIntlClientProvider>
);
```

---

## 10. Test Quality Checklist

Before committing tests:
- [ ] Test describes behaviour, not implementation
- [ ] No assertions on CSS class names
- [ ] Async operations are awaited or wrapped in `waitFor`
- [ ] All mocks are reset between tests (use `beforeEach` or `jest.clearAllMocks()`)
- [ ] Test IDs use semantic queries (`getByRole`, `getByLabelText`, `getByText`) over `getByTestId`
- [ ] Each `describe` block covers one component/hook/utility
