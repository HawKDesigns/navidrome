import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useTranslate,
  FileInput,
  ImageField,
} from 'react-admin'
import { urlValidate } from '../utils/validations'
import { Title } from '../common'

const RadioTitle = ({ record }) => {
  const translate = useTranslate()
  const resourceName = translate('resources.radio.name', {
    smart_count: 1,
  })
  return <Title subTitle={`${resourceName} ${record ? record.name : ''}`} />
}

const RadioCreate = (props) => {
  return (
    <Create title={<RadioTitle />} {...props}>
      <SimpleForm variant="outlined" {...props}>
        <TextInput source="name" validate={[required()]} />
        <TextInput
          type="url"
          source="streamUrl"
          fullWidth
          validate={[required(), urlValidate]}
        />
        <TextInput
          type="url"
          source="homePageUrl"
          fullWidth
          validate={[urlValidate]}
        />
        <TextInput source="description" fullWidth multiline />
        <TextInput
          type="url"
          source="imageUrl"
          label="Image URL (optional)"
          fullWidth
          validate={[urlValidate]}
        />
        <FileInput source="image" label="Upload image (optional)" accept="image/*">
          <ImageField source="src" title="title" />
        </FileInput>
      </SimpleForm>
    </Create>
  )
}

export default RadioCreate
