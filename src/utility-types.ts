export type ComponentProps<T> = T extends React.Component<infer R> ? R : T
