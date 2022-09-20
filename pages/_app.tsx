import "../styles/globals.css"
import type { AppProps } from "next/app"
import {
  MantineProvider,
  AppShell,
  Header,
  Title,
  Container,
  Group,
  Text,
  Stack,
  Anchor,
  Center,
} from "@mantine/core"
import Link from "next/link"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          fontFamily: "Prompt",
          headings: { fontFamily: "Prompt" },
        }}
      >
        <AppShell
          padding="md"
          header={
            <Header height={60} style={{
              alignItems: "center", display: "flex", justifyContent: "start", marginLeft: 30, flexWrap: 'nowrap'
            }}>
              <Stack>
                <Group spacing={40}>
                  <Anchor href="/">Home</Anchor>
                  <Anchor href="/faq">FAQ</Anchor>
                </Group>
              </Stack>
            </Header>
          }
        >
          <Container>
            <Component {...pageProps} />
          </Container>
        </AppShell>
      </MantineProvider>
    </>
  )
}

export default MyApp
