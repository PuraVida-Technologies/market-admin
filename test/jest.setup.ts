import { PrivateApplicationConfig } from "@/types/PrivateApplicationConfig";
import { iocContainer } from "@/inversify.config";
import { MockApiClient } from "@mocks/api/home/MockApiClient";
import { MockStorage } from "@mocks/Storage";

beforeAll(() => {
  const config: PrivateApplicationConfig =
    iocContainer.get<PrivateApplicationConfig>("applicationConfig");

  // Create a config for our mock client
  config.providers["mock"] = { baseUrl: "" };

  // Add a mock client to the IoC container.
  // The mock client is primary used to test
  // the underlying AbstractApiClient.
  iocContainer.bind<MockApiClient>("mockApiClient").to(MockApiClient);
});

if (!global.window) {
  global["window"] = {} as Window & typeof globalThis;
}

Object.defineProperty(global.window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

if (!global.sessionStorage) {
  global.sessionStorage = new MockStorage();
}

if (!global.localStorage) {
  global.localStorage = new MockStorage();
}
