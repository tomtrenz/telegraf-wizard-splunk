import React, { useEffect, useState } from "react";
import SearchJob from "@splunk/search-job";

const SplunkSearchComponent = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchQuery = ' | telegraf cmd_params="--version" ';
    const earliestTime = "-24h";
    const latestTime = "now";

    const fetchSearchResults = async () => {
      try {
        const searchJob = SearchJob.create({
            search: searchQuery,
            earliest_time: earliestTime,
            latest_time: latestTime,
        }, {
            app: 'telegraf-wizard-app',
            owner: 'admin',
        });
        searchJob.getResults().subscribe(result => {
            console.log(result);
            setCount(result.results[0].output);
            setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearchResults();
  }, []);

return (
    <div>
        {loading ? (
            <h2>Loading...</h2>
        ) : (
            <pre>
                <code>{count}</code>
            </pre>
        )}
    </div>
);
};

export default SplunkSearchComponent;