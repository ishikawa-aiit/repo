/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tab, TabList, TabPanel, TabPanels, Tabs, Stack, Heading } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Disclosure / Tabs',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  return (
    <Stack spacing="5">
      <Tabs>
        <TabList>
          <Tab>Settings</Tab>
          <Tab isDisabled>Billings</Tab>
          <Tab isDisabled>Preferences</Tab>
          <Tab>Shut Down</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Settings</TabPanel>
          <TabPanel>Billings</TabPanel>
          <TabPanel>Preferences</TabPanel>
          <TabPanel>Shut Down</TabPanel>
        </TabPanels>
      </Tabs>

      <Heading>variant=&quot;soft-rounded&quot;</Heading>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Settings</Tab>
          <Tab isDisabled>Billings</Tab>
          <Tab isDisabled>Preferences</Tab>
          <Tab>Shut Down</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Settings</TabPanel>
          <TabPanel>Billings</TabPanel>
          <TabPanel>Preferences</TabPanel>
          <TabPanel>Shut Down</TabPanel>
        </TabPanels>
      </Tabs>

      <Heading>variant=&quot;solid-rounded&quot;</Heading>
      <Tabs variant="solid-rounded">
        <TabList>
          <Tab>Settings</Tab>
          <Tab isDisabled>Billings</Tab>
          <Tab isDisabled>Preferences</Tab>
          <Tab>Shut Down</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Settings</TabPanel>
          <TabPanel>Billings</TabPanel>
          <TabPanel>Preferences</TabPanel>
          <TabPanel>Shut Down</TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
