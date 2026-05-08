export class SystemDegradedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SystemDegradedError';
  }
}

export class VersionInfoMissingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VersionInfoMissingError';
  }
}