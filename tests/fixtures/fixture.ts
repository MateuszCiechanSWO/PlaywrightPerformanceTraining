import {test as base} from "@playwright/test";

import {LeftPane} from "../pages/left-pane";
import { GDPRConsent } from "../pages/gdpr-consent-page";

const test = base.extend<{
    leftPane: LeftPane;
    gdprConsent: GDPRConsent;
}>({
    leftPane: async ({page}, use) => {
        await use(new LeftPane(page));
    },
    gdprConsent: async ({page}, use) => {
        await use(new GDPRConsent(page));
    }
});

export default test;
