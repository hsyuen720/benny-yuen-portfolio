import { render } from "@testing-library/react";

import Image from "~/components/image";

describe("Image Component", () => {
  it("renders image with src, alt, width and height", () => {
    const { container } = render(
      <Image src="/test-image.jpg" alt="Test Image" width={100} height={100} />,
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "Test Image");
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <Image src="/test.jpg" alt="Test" width={100} height={100} className="custom-class" />,
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("sets draggable to false by default", () => {
    const { container } = render(<Image src="/test.jpg" alt="Test" width={100} height={100} />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("draggable", "false");
  });

  it("allows draggable to be set to true", () => {
    const { container } = render(
      <Image src="/test.jpg" alt="Test" width={100} height={100} draggable={true} />,
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("draggable", "true");
  });

  it("sets container min dimensions based on width and height", () => {
    const { container } = render(<Image src="/test.jpg" alt="Test" width={200} height={150} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.minWidth).toBe("200px");
    expect(wrapper.style.minHeight).toBe("150px");
  });
});
