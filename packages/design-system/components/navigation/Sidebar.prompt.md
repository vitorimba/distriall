Desktop sidebar (240px, ≥768px). Defaults to the full 9-item DistriAll nav.

```jsx
<Sidebar active="orders" onNavigate={go} footer={<AccountSwitcher />} />
```

Also exports `Wordmark` (DISTRI white + ALL orange) and `NAV_ITEMS`. On mobile, hide it and use `BottomNav`.
