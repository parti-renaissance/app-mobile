import InternAlert, { InternAlertProps } from './InternAlert'

export default {
  title: 'InternAlert',
  component: InternAlert,
}

export const Info = {
  args: {
    type: 'info',
    children: 'Alert info lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  } satisfies InternAlertProps,
}

export const Danger = {
  args: {
    type: 'danger',
    children: 'Alert danger lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  } satisfies InternAlertProps,
}

export const Warning = {
  args: {
    type: 'warning',
    children: 'Alert warning lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  } satisfies InternAlertProps,
}

export const Success = {
  args: {
    type: 'success',
    children: 'Alert success lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  } satisfies InternAlertProps,
}
