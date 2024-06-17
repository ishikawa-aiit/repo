import { AxiosResponse, AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

import { showToastOutOfService, showToastUnauthorized, toast } from '@/components/molecules'
import { CustomTemplateTypes } from '@/components/types'
import { useClientWithToken } from '@/hooks/server/useClientWithToken'
import { ApiPostCustomTemplateTypes, ClientWithToken } from '@/types'

const postCustomTemplate = async (req: ApiPostCustomTemplateTypes.Request, client: ClientWithToken) => {
  const { data, status } = await client.post<
    ApiPostCustomTemplateTypes.Request,
    AxiosResponse<ApiPostCustomTemplateTypes.Response>
  >('/api/templates', req)

  data.status = status

  return data
}

/**
 * カスタムテンプレートを保存するカスタムフック
 */
export const usePostCustomTemplate = () => {
  const client = useClientWithToken()
  const router = useRouter()

  const { mutate } = useMutation<
    ApiPostCustomTemplateTypes.Response,
    AxiosError,
    ApiPostCustomTemplateTypes.Request,
    CustomTemplateTypes.CustomTemplatesProps
  >(
    (req) => {
      return postCustomTemplate(req, client)
    },
    {
      onSuccess: async (result, _req) => {
        toast({
          status: 'success',
          title:
            result.status === StatusCodes.CREATED ? 'テンプレートを作成しました。' : 'テンプレートを編集しました。',
        })

        await router.push('/weekly-reports/create')
      },
      onError: (error, _request, _context) => {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          showToastUnauthorized()
        } else {
          showToastOutOfService()
        }
      },
    },
  )

  return { mutate }
}
