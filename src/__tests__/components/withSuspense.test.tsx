import { render, screen } from "@testing-library/react";

import withSuspense from "~/components/suspense/index";

// Mock component that renders immediately
const MockComponent = ({ title = "Test Component" }: { title?: string }) => {
  return <div>{title}</div>;
};

// Mock component with props
interface MockComponentWithPropsProps {
  name: string;
  age: number;
  isActive?: boolean;
}

const MockComponentWithProps = ({ name, age, isActive = false }: MockComponentWithPropsProps) => {
  return (
    <div>
      <span data-testid="name">{name}</span>
      <span data-testid="age">{age}</span>
      <span data-testid="active">{isActive ? "Active" : "Inactive"}</span>
    </div>
  );
};

describe("withSuspense HOC", () => {
  describe("Basic Functionality", () => {
    it("should render the wrapped component successfully", () => {
      const SuspenseComponent = withSuspense(MockComponent);

      render(<SuspenseComponent />);

      expect(screen.getByText("Test Component")).toBeInTheDocument();
    });

    it("should pass props to the wrapped component correctly", () => {
      const SuspenseComponentWithProps = withSuspense(MockComponentWithProps);

      render(<SuspenseComponentWithProps name="John Doe" age={30} isActive={true} />);

      expect(screen.getByTestId("name")).toHaveTextContent("John Doe");
      expect(screen.getByTestId("age")).toHaveTextContent("30");
      expect(screen.getByTestId("active")).toHaveTextContent("Active");
    });

    it("should set the correct displayName", () => {
      const SuspenseComponent = withSuspense(MockComponent);

      expect(SuspenseComponent.displayName).toBe("withSuspense(MockComponent)");
    });

    it("should handle components without displayName or name", () => {
      const AnonymousComponent = () => <div>Anonymous</div>;
      Object.defineProperty(AnonymousComponent, "name", { value: "" });

      const SuspenseComponent = withSuspense(AnonymousComponent);

      expect(SuspenseComponent.displayName).toBe("withSuspense()");
    });
  });

  describe("TypeScript Support", () => {
    it("should maintain type safety for component props", () => {
      const SuspenseComponentWithProps = withSuspense(MockComponentWithProps);

      render(<SuspenseComponentWithProps name="Jane Doe" age={25} isActive={false} />);

      expect(screen.getByTestId("name")).toHaveTextContent("Jane Doe");
      expect(screen.getByTestId("age")).toHaveTextContent("25");
      expect(screen.getByTestId("active")).toHaveTextContent("Inactive");
    });

    it("should work with different component types", () => {
      const FunctionComponent = () => <div>Function Component</div>;
      const ForwardRefComponent = () => <div>ForwardRef Component</div>;

      const SuspenseFunctionComponent = withSuspense(FunctionComponent);
      const SuspenseForwardRefComponent = withSuspense(ForwardRefComponent);

      render(
        <div>
          <SuspenseFunctionComponent />
          <SuspenseForwardRefComponent />
        </div>,
      );

      expect(screen.getByText("Function Component")).toBeInTheDocument();
      expect(screen.getByText("ForwardRef Component")).toBeInTheDocument();
    });
  });

  describe("Options Configuration", () => {
    it("should use default fallback when no options provided", () => {
      const SuspenseComponent = withSuspense(MockComponent);

      render(<SuspenseComponent />);

      // Component renders immediately, so no loading state
      expect(screen.getByText("Test Component")).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    it("should handle custom fallback option", () => {
      const customFallback = <div data-testid="custom-loader">Custom Loading...</div>;
      const SuspenseComponent = withSuspense(MockComponent, {
        fallback: customFallback,
      });

      render(<SuspenseComponent />);

      // Component renders immediately, so no loading state
      expect(screen.getByText("Test Component")).toBeInTheDocument();
      expect(screen.queryByTestId("custom-loader")).not.toBeInTheDocument();
    });

    it("should handle null fallback", () => {
      const SuspenseComponent = withSuspense(MockComponent, {
        fallback: null,
      });

      render(<SuspenseComponent />);

      expect(screen.getByText("Test Component")).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    it("should handle undefined options", () => {
      const SuspenseComponent = withSuspense(MockComponent, undefined);

      render(<SuspenseComponent />);

      expect(screen.getByText("Test Component")).toBeInTheDocument();
    });

    it("should handle empty options object", () => {
      const SuspenseComponent = withSuspense(MockComponent, {});

      render(<SuspenseComponent />);

      expect(screen.getByText("Test Component")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle components that render null", () => {
      const NullComponent = () => null;
      const SuspenseNullComponent = withSuspense(NullComponent);

      render(<SuspenseNullComponent />);

      // Should not crash and not render anything
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    it("should preserve component behavior", () => {
      const ConditionalComponent = ({ show }: { show: boolean }) => {
        return show ? <div>Visible</div> : null;
      };

      const SuspenseConditionalComponent = withSuspense(ConditionalComponent);

      const { rerender } = render(<SuspenseConditionalComponent show={false} />);
      expect(screen.queryByText("Visible")).not.toBeInTheDocument();

      rerender(<SuspenseConditionalComponent show={true} />);
      expect(screen.getByText("Visible")).toBeInTheDocument();
    });
  });

  describe("HOC Composition", () => {
    it("should work with other HOCs", () => {
      // Mock another HOC
      const withLogging = <P extends object>(Component: React.ComponentType<P>) => {
        const WrappedComponent = (props: P) => {
          return <Component {...props} />;
        };
        WrappedComponent.displayName = `withLogging(${Component.displayName || Component.name || "Component"})`;
        return WrappedComponent;
      };

      const EnhancedComponent = withSuspense(withLogging(MockComponent));

      render(<EnhancedComponent title="Enhanced" />);

      expect(screen.getByText("Enhanced")).toBeInTheDocument();
      expect(EnhancedComponent.displayName).toContain("withSuspense");
    });
  });
});
