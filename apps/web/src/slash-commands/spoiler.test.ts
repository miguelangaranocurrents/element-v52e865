/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE in the repository root for full details.
*/

// @vitest-environment happy-dom

import { describe, it, expect } from "vitest";

import { setUpCommandTest } from "./__mocks__";

describe("/spoiler", () => {
    const roomId = "!room:example.com";

    it("should wrap the message in a spoiler span", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler secret");

        const content = await command.run(client, roomId, null, "secret").promise;
        expect(content).toMatchObject({
            body: "secret",
            formatted_body: expect.stringContaining("<span data-mx-spoiler>"),
        });
    });

    it("should render Markdown inside the spoiler", async () => {
        const { client, command } = setUpCommandTest(roomId, "/spoiler the **secret** plan");

        const content = await command.run(client, roomId, null, "the **secret** plan").promise;
        expect(content).toMatchObject({
            formatted_body: expect.stringContaining("<strong>secret</strong>"),
        });
        expect(content).toMatchObject({
            formatted_body: expect.not.stringContaining("**secret**"),
        });
    });
});
