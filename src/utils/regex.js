export const PHONE_REGEX = /^(?:\d{10}|\d{11}|\d{3}-\d{3}-\d{4}|\d{4}-\d{2}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/g;

// Email regex which works 99.99% of time
// > https://emailregex.com/
//
// eslint-disable-next-line
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
