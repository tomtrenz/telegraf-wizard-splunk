import os, sys, time
import json

# Library-loading boilerplate
APP_NAME = 'telegraf-wizard-app'
SPLUNK_HOME = os.environ['SPLUNK_HOME']
SPLUNK_APP_HOME = os.path.join(SPLUNK_HOME, 'etc', 'apps', APP_NAME)

# Splunk SDK imports
import splunklib.client as client
from splunklib.searchcommands import dispatch, GeneratingCommand, Configuration, Option, validators


@Configuration()
class TelegrafSearch(GeneratingCommand):
    command = Option(require=False, default='info')

    def generate(self):
        yield {
            '_time': time.time(),
            '_raw': f"Ty chce zobrazit '{self.command}' jooo ?",
            'APP_NAME': APP_NAME,
            'SPLUNK_HOME': SPLUNK_HOME,
            'SPLUNK_APP_HOME': SPLUNK_APP_HOME
        }

dispatch(TelegrafSearch, sys.argv, sys.stdin, sys.stdout, __name__)
