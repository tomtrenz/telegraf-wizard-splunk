import React, { useEffect, useState } from "react";
import { SplunkSearch } from "@splunk/splunk-utils/search";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

import layout from '@splunk/react-page';
import TelegrafWizardComponent from '@splunk/telegraf-wizard-component';
import { getUserTheme } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';
import SplunkSearchComponent from "@splunk/telegraf-wizard-component/src/SplunkSearchComponent";

getUserTheme()
    .then((theme) => {
        layout(
            <StyledContainer>
            <StyledGreeting>Hello, from inside TelegrafWizardApp! </StyledGreeting>
            <div>Your component will appear below.</div>
            <TelegrafWizardComponent name="from inside TelegrafWizardComponent" />
            <SplunkSearchComponent />
            </StyledContainer>,
            {
            theme,
            }
        );
    })
    .catch((e) => {
        const errorEl = document.createElement('span');
        errorEl.innerHTML = e;
        document.body.appendChild(errorEl);
    });
