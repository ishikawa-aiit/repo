import { Box, Center, Select, Heading, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, memo, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import { settingTeamSelectProp, slackAuthorizeUrl } from './constants'
import { SettingType } from './type'

import { Button } from '@/components/molecules'
import { DefaultLayout, SettingSlack } from '@/components/organisms'
import { user as userState } from '@/contexts/global/atoms/User'
import { usePatchProjectTeam } from '@/hooks/api'

export const SettingTemplate: FC<SettingType.Props> = memo(({ projectTeams, ...props }) => {
  const [user] = useRecoilState(userState)
  const { mutate } = usePatchProjectTeam()
  const { register, setValue } = useForm<SettingType.Inputs>()
  const teamSelectRef = useRef<HTMLSelectElement | null>(null)
  const teamSelectProp = settingTeamSelectProp[0]
  const router = useRouter()

  useEffect(() => {
    if (projectTeams.length && user && teamSelectRef.current) {
      const selectedIndex = user.team ? user.team.id : 0

      teamSelectRef.current.selectedIndex = selectedIndex
    }
  }, [projectTeams, user])

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    let teamId: number | null = null

    if (e.target.value) {
      teamId = e.target.value as unknown as number
    }

    setValue(teamSelectProp.name, teamId)

    mutate({ teamId })
  }

  const onClickSlackButton = async () => {
    await router.push(slackAuthorizeUrl)
  }

  return (
    <DefaultLayout heading="設定" {...props}>
      <form>
        {user && (
          <VStack alignItems="left" w="100%">
            <Heading size="sm">{teamSelectProp.label}</Heading>
            <Box as="p" mb={12}>
              所属PTを選択することで、所属PT内で共有のテンプレートを作成・利用できるようになります。
            </Box>
            <Select
              data-cy={`Select_${teamSelectProp.name}`}
              data-testid={`Select_${teamSelectProp.name}`}
              {...register(teamSelectProp.name)}
              ref={teamSelectRef}
              onChange={(e) => {
                return onChangeSelect(e)
              }}
            >
              {projectTeams.map(({ id, name }, index) => {
                return (
                  <option value={id ?? ''} key={index}>
                    {name}
                  </option>
                )
              })}
            </Select>
          </VStack>
        )}
      </form>
      {user && (
        <VStack alignItems={'left'} mt={12}>
          <Heading size="sm">Slackリマインダー</Heading>
          <Text>Slackにリマインダーが届きます。 （送信日時：前日 21時45分）</Text>
          <SettingSlack hasSlackConnection={user.hasSlackConnection} />
          {!user.hasSlackConnection && (
            <Center mt={8}>
              <Button onClick={onClickSlackButton} data-testid="ButtonSlackConnection" data-cy="ButtonSlackConnection">
                Slackリマインダーを設定する
              </Button>
            </Center>
          )}
        </VStack>
      )}
    </DefaultLayout>
  )
})
