export type Word = {
  id?: string
  userName?: string
  value?: string
  createdAt?: Date
  type?: 'command' | 'bot' | 'obstacle'
}
