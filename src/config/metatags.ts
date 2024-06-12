import clientEnv from './clientEnv'

const prefixtTitle = `• ${clientEnv.APP_NAME}`

export const createTitle = (title: string) => {
  return `${title} ${prefixtTitle}`
}
