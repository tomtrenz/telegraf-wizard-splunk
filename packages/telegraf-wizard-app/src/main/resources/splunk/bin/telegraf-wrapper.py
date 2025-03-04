import os, sys, time
import json

# Library-loading boilerplate
APP_NAME = 'telegraf-wizard-app'
SPLUNK_HOME = os.environ['SPLUNK_HOME']
SPLUNK_APP_HOME = os.path.join(SPLUNK_HOME, 'etc', 'apps', APP_NAME)

# Splunk SDK imports
import splunklib.client as client
from splunklib.searchcommands import dispatch, GeneratingCommand, Configuration, Option, validators
import subprocess

# Specify the full path to the telegraf binary
TELEGRAF_PATH = '/opt/homebrew/bin/telegraf'  # Update this path as needed

@Configuration()
class TelegrafSearch(GeneratingCommand):
    cmd_params = Option(require=False, default='--help')

    def generate(self):
        process = subprocess.Popen([TELEGRAF_PATH, f"{self.cmd_params}"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        while True:
            try:
                output, errors = process.communicate(timeout=20)
                if output:
                    yield {
                        '_time': time.time(),
                        'output': output.strip(),
                        '_raw': output.strip(),
                        'service': self.service.token,
                        'APP_NAME': APP_NAME,
                        'SPLUNK_HOME': SPLUNK_HOME,
                        'SPLUNK_APP_HOME': SPLUNK_APP_HOME
                    }
                if errors:
                    yield {
                        '_time': time.time(),
                        'output': errors.strip(),
                        '_raw': errors.strip(),
                        'APP_NAME': APP_NAME,
                        'SPLUNK_HOME': SPLUNK_HOME,
                        'SPLUNK_APP_HOME': SPLUNK_APP_HOME
                    }
            except subprocess.TimeoutExpired:
                pass

            if process.poll() is not None:
                break




dispatch(TelegrafSearch, sys.argv, sys.stdin, sys.stdout, __name__)
