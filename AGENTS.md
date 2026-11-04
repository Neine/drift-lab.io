## Blog publishing
- Store authored articles in Cloud with admin roles in a separate protected role table; only explicitly granted admins may write, while public readers see published articles only.
- Load public articles through server functions and query-backed route loaders; keep existing external Notes & Insights links alongside authored articles.