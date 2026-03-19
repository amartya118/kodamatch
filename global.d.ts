declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T>(value: T): [T, (next: T | ((current: T) => T)) => void];
}

declare module 'react/jsx-runtime' {
  export const Fragment: unique symbol;
  export function jsx(type: any, props: any, key?: any): JSX.Element;
  export function jsxs(type: any, props: any, key?: any): JSX.Element;
}

declare module 'expo-status-bar' {
  export const StatusBar: (props: Record<string, unknown>) => JSX.Element;
}

declare module 'react-native' {
  export const Pressable: any;
  export const SafeAreaView: any;
  export const ScrollView: any;
  export const StatusBar: any;
  export const StyleSheet: { create<T>(styles: T): T };
  export const Text: any;
  export const TextInput: any;
  export const View: any;
}
