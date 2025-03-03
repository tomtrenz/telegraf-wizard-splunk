import React from 'react';

import layout from '@splunk/react-page';
import TelegrafWizardComponent from '@splunk/telegraf-wizard-component';
import { getUserTheme } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

getUserTheme()
    .then((theme) => {
        layout(
            <StyledContainer>
                <StyledGreeting>Hello, from inside TelegrafWizardApp!</StyledGreeting>
                <div>Your component will appear below.</div>
                <TelegrafWizardComponent name="from inside TelegrafWizardComponent" />
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
