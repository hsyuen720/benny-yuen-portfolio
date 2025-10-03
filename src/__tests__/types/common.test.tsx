import type { ValueOf, WrapperProps } from "~/types/common";

describe("Common Types", () => {
  describe("ValueOf", () => {
    it("should extract value types from object", () => {
      type TestObject = {
        a: string;
        b: number;
        c: boolean;
      };

      type TestValue = ValueOf<TestObject>;

      // Type assertions to verify the type
      const stringValue: TestValue = "test";
      const numberValue: TestValue = 123;
      const booleanValue: TestValue = true;

      expect(typeof stringValue).toBe("string");
      expect(typeof numberValue).toBe("number");
      expect(typeof booleanValue).toBe("boolean");
    });

    it("should work with const objects", () => {
      const TestConst = {
        First: "first",
        Second: "second",
      } as const;

      type TestValue = ValueOf<typeof TestConst>;

      // Use the const to satisfy the linter
      const value: TestValue = TestConst.First;
      expect(value).toBe("first");
    });
  });

  describe("WrapperProps", () => {
    it("should accept ReactNode as children", () => {
      const props: WrapperProps = {
        children: <div>Test</div>,
      };

      expect(props).toHaveProperty("children");
    });

    it("should accept string as children", () => {
      const props: WrapperProps = {
        children: "Text content",
      };

      expect(props.children).toBe("Text content");
    });

    it("should accept null as children", () => {
      const props: WrapperProps = {
        children: null,
      };

      expect(props.children).toBeNull();
    });

    it("should accept array of elements as children", () => {
      const props: WrapperProps = {
        children: [<div key="1">First</div>, <div key="2">Second</div>],
      };

      expect(Array.isArray(props.children)).toBe(true);
    });
  });
});
