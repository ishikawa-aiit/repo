import { useDisclosure } from '@chakra-ui/hooks'
import {
  Box,
  VStack,
  Center,
  Select,
  HStack,
  FormControl as ChakraFormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { DateTime as DateTime } from 'luxon'
import { useRouter } from 'next/router'
import { FC, memo, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

import { weeklyReportSelectProp, weeklyReportTextareaProps, modelSentences } from './constants'
import { CreationTemplateType } from './type'

import { Button, FormControl, Textarea, Link, showToastOutOfService } from '@/components/molecules'
import { DefaultLayout, ModelSentenceLayout, TemplateModal } from '@/components/organisms'
import { RequirementTypes, WeeklyReportsTypes } from '@/components/types'
import { usePostWeeklyReport } from '@/hooks/api'
import { QueryKeys } from '@/types'
import {
  convertTargetDurationStartEndToReportWeekString,
  isInSubmissionDuration,
  sortWeeklyReportQueryData,
} from '@/utils'

export const CreationTemplate: FC<CreationTemplateType.Props> = memo(({ customTemplates, requirements, ...props }) => {
  const { mutate } = usePostWeeklyReport()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const templateSelectRef = useRef<HTMLSelectElement>(null)
  const { register, handleSubmit, setValue, getValues, watch } = useForm<CreationTemplateType.Inputs>()
  const queryClient = useQueryClient()
  const templateSelectProp = weeklyReportSelectProp[0]
  const weekSelectProp = weeklyReportSelectProp[1]

  // 初回のテンプレート反映時、フォームの値をセットしても、テキストエリアが値が入力されたことを認識しない
  // そのため、フォームの値をwatch（https://react-hook-form.com/api/useform/watch/）で常時監視し、
  // 変更が加わり次第、レンダリングを行わせる
  useEffect(() => {
    watch()
  }, [watch])

  const applyTemplate = () => {
    customTemplates.forEach((customTemplate, index) => {
      if (index === templateSelectRef?.current?.selectedIndex) {
        ;(Object.keys(customTemplate) as (keyof CreationTemplateType.Inputs)[]).forEach(async (key) => {
          if (['id', 'name', 'template', 'team'].includes(key)) {
            return
          }
          setValue(key, (customTemplate[key] as unknown as string) ?? '')
        })
      }
    })
  }

  /**
   * 報告週セレクトボックスで使用するリストを作成する
   */
  const requirementDisplays: CreationTemplateType.RequirementDisplayType[] = requirements.map((requirement) => {
    return {
      id: requirement.id === null || requirement.id === undefined ? '' : requirement.id.toString(),
      name: convertTargetDurationStartEndToReportWeekString(
        requirement.targetDuration.startAt,
        requirement.targetDuration.endAt,
      ),
    }
  })

  /**
   * 初期表示する報告要件IDをstring型で返す、初期表示対象の報告要件IDがない場合はundefinedを返す
   *
   * @returns 報告要件ID
   */
  const getSelectedRequirementId = () => {
    // 現在時刻
    const dateNow: DateTime = DateTime.now()
    // 現在時刻が受付期限内となる報告要件のリストを取得する
    const isInSubmissionDurationRequirements: RequirementTypes.RequirementProps[] = requirements.filter(
      (requirement: RequirementTypes.RequirementProps) => {
        return isInSubmissionDuration(
          requirement.submissionDuration.startAt,
          requirement.submissionDuration.endAt,
          dateNow,
        )
      },
    )
    // 現在時刻が受付期限内となる報告要件が存在しない場合はundefinedとする
    if (isInSubmissionDurationRequirements.length === 0) {
      return undefined
    }
    // より受付終了日時の早い報告要件の報告要件IDを返す
    return isInSubmissionDurationRequirements
      .reduce((req, reqCompare) => {
        return req.submissionDuration.endAt < reqCompare.submissionDuration.endAt ? req : reqCompare
      })
      .id.toString()
  }

  const onSubmit = async (values: CreationTemplateType.Inputs) => {
    const requirement = requirements.find((item) => {
      return item.id.toString() === values.requirementId
    })

    if (requirement === undefined) {
      console.error('Requirement is not found.')
      showToastOutOfService()
      return
    }

    await queryClient.cancelQueries(QueryKeys.GET_WEEKLY_REPORTS)
    // 作成に失敗した場合に戻すデータは現在登録されてるデータ
    const rollbackQueryData =
      queryClient.getQueryData<WeeklyReportsTypes.ReportsProps>(QueryKeys.GET_WEEKLY_REPORTS) || []
    // 楽観的更新で使用するデータは元のデータと作成したデータをソートしたもの
    const temporaryQueryData = sortWeeklyReportQueryData([
      { requirement, ...values },
      ...rollbackQueryData,
    ]) as WeeklyReportsTypes.ReportsProps

    // 次ページで表示する週報
    const hash = temporaryQueryData.findIndex((item) => {
      // 作成前のデータは id が存在しない
      return item.id === undefined
    })
    // findIndex は要素が見つからない場合は -1 を返す
    if (hash === -1) {
      console.error('Hash is not found.')
      return
    }

    mutate({ request: values, temporaryQueryData, rollbackQueryData })

    router.push(`/weekly-reports/list#${hash}`)
  }

  const onClickApplyTemplateButton = () => {
    const { activityTime, doneActivity, todoActivity, solution, event, remark } = getValues()
    const templateValue = {
      activityTime,
      doneActivity,
      todoActivity,
      solution,
      event,
      remark,
    }

    const hasFilledField = (
      Object.keys(templateValue) as (keyof Omit<CreationTemplateType.Inputs, 'template' | 'name' | 'requirementId'>)[]
    ).some((key) => {
      return !!templateValue[key]
    })

    if (hasFilledField) {
      onOpen()
      return
    }

    applyTemplate()
  }

  return (
    <DefaultLayout heading="週報を作成する" innerWidth="100%" {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModelSentenceLayout modelSentences={modelSentences}>
          <Box gridArea="top_left">
            <VStack spacing={8}>
              <HStack maxW="100%" alignSelf="flex-start" mb={6} spacing={4}>
                <ChakraFormControl>
                  <Flex>
                    <Flex alignItems="center" w={28}>
                      <FormLabel m={0} fontWeight="normal">
                        {templateSelectProp.label}
                      </FormLabel>
                    </Flex>
                    <Box flex={1}>
                      <Select
                        data-cy={`Select_${templateSelectProp.name}`}
                        data-testid={`Select_${templateSelectProp.name}`}
                        {...register(templateSelectProp.name)}
                        ref={templateSelectRef}
                      >
                        {customTemplates.map(({ name }, index) => {
                          return (
                            <option value={name} key={index}>
                              {name}
                            </option>
                          )
                        })}
                      </Select>
                    </Box>
                  </Flex>
                </ChakraFormControl>
                <Button
                  data-testid="ApplyTemplateButton"
                  data-cy="ApplyTemplateButton"
                  type="button"
                  onClick={onClickApplyTemplateButton}
                >
                  反映する
                </Button>
              </HStack>
            </VStack>

            <Box marginBottom={20}>
              <Text data-testid="NaviLinkBeforeText" as="small">
                「
                <Link href="/custom-templates/create" text="テンプレートを作成・編集する" />
                」からテンプレートを作成することができます。
                <br />
                テンプレートを作成することで、週報を作成する際にテンプレートの内容から週報を書き始めることができます。
                先生から週報の書き方に指定があった際に、そのフォーマットをテンプレートとして登録しておくと便利です。
              </Text>
            </Box>

            <VStack spacing={8}>
              <FormControl label={weekSelectProp.label}>
                <Select
                  data-testid={`Select_${weekSelectProp.name}`}
                  placeholder={weekSelectProp.placeholder}
                  {...register(weekSelectProp.name)}
                  defaultValue={getSelectedRequirementId()}
                >
                  {requirementDisplays.map((requirementDisplay) => {
                    return (
                      <option value={requirementDisplay.id} key={requirementDisplay.id}>
                        {requirementDisplay.name}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
            </VStack>
          </Box>

          {weeklyReportTextareaProps.map((textareaProp, index) => {
            return (
              <Box gridArea={`${textareaProp.name}_left`} key={index}>
                <FormControl label={textareaProp.label}>
                  <Textarea
                    placeholder={textareaProp.placeholder}
                    {...register(textareaProp.name)}
                    data-testid={`TextArea_${textareaProp.name}`}
                  />
                </FormControl>
              </Box>
            )
          })}

          <Box gridArea="button_left">
            <Center>
              <Button type="submit">保存する</Button>
            </Center>
          </Box>
        </ModelSentenceLayout>
      </form>
      <TemplateModal isOpen={isOpen} onClose={onClose} onApply={applyTemplate} />
    </DefaultLayout>
  )
})
