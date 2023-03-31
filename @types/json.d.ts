declare module '*/defaultConfig.json' {
  interface IType {
    windowSize: {
      width: number;
      height: number;
    };
  }
  const value: IType;
  export = value;
}
