import "@testing-library/jest-dom";

global.fetch = global.fetch || (() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
    })
);
