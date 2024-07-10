import {test as base} from "@playwright/test";

import { LeftPane } from "../pages/left-pane-page";
import { GDPRConsent } from "../pages/gdpr-consent-page";
import { Workspaces } from "../pages/workspaces-page";

const test = base.extend<{
    leftPane: LeftPane;
    gdprConsent: GDPRConsent;
    workspaces: Workspaces;
}>({
    leftPane: async ({page}, use) => {
        await use(new LeftPane(page));
    },
    gdprConsent: async ({page}, use) => {
        await use(new GDPRConsent(page));
    },
    workspaces: async ({page}, use) => {
        await use(new Workspaces(page));
    }
});

export default test;
