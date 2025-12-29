import React from 'react'
import {
  Datagrid,
  DateField,
  EditButton,
  Filter,
  ImageField,
  SearchInput,
  SimpleList,
  TextField,
  CreateButton,
  UrlField,
  useMediaQuery,
  cloneElement,
  sanitizeListRestProps,
} from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import { List } from '../common'
import { ToggleFieldsMenu, useSelectedFields } from '../common'
import { StreamField } from './StreamField'
import { setTrack } from '../actions'
import { songFromRadio } from './helper'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
  row: {
    '&:hover': {
      '& $contextMenu': {
        visibility: 'visible',
      },
    },
  },
  contextMenu: {
    visibility: 'hidden',
  },
})

const RadioFilter = (props) => (
  <Filter {...props} variant={'outlined'}>
    <SearchInput id="search" source="name" alwaysOn />
  </Filter>
)

const RadioListActions = ({
  className,
  filters,
  resource,
  showFilter,
  displayedFilters,
  filterValues,
  isAdmin,
  ...rest
}) => {
  const isNotSmall = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  return (
    <div className={className} {...sanitizeListRestProps(rest)}>
      {isAdmin && (
        <CreateButton basePath="/radio">Create</CreateButton>
      )}
      {isNotSmall && <ToggleFieldsMenu resource="radio" />}
    </div>
  )
}

const RadioList = ({ permissions, ...props }) => {
  const classes = useStyles()
  const isXsmall = useMediaQuery((theme) => theme.breakpoints.down('xs'))
  const dispatch = useDispatch()
  const isAdmin = permissions === 'admin'

  const toggleableFields = {
    name: <TextField source="name" />,
    homePageUrl: (
      <UrlField
        source="homePageUrl"
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        rel="noopener noreferrer"
      />
    ),
    streamUrl: <TextField source="streamUrl" />,
    updatedAt: <DateField source="updatedAt" showTime />,
    createdAt: <DateField source="createdAt" showTime />,
  }

  const columns = useSelectedFields({
    resource: 'radio',
    columns: toggleableFields,
    defaultOff: ['createdAt'],
  })

  const handleRowClick = async (id, basePath, record) => {
    dispatch(setTrack(await songFromRadio(record)))
  }

  return (
    <List
      {...props}
      exporter={false}
      sort={{ field: 'name', order: 'ASC' }}
      bulkActionButtons={isAdmin ? undefined : false}
      hasCreate={isAdmin}
      actions={<RadioListActions isAdmin={isAdmin} />}
      filters={<RadioFilter />}
      perPage={isXsmall ? 25 : 10}
    >
      {isXsmall ? (
        <SimpleList
          leftIcon={(r) => (
            r.imageUrl ? (
              <img
                src={r.imageUrl}
                alt={r.name}
                style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }}
              />
            ) : (
              <StreamField
                record={r}
                source={'streamUrl'}
                hideUrl
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              />
            )
          )}
          primaryText={(r) => r.name}
          secondaryText={(r) => r.homePageUrl}
        />
      ) : (
        <Datagrid rowClick={handleRowClick} classes={{ row: classes.row }}>
          <ImageField source="imageUrl" title="name" />
          {columns}
          <TextField source="description" />
          {isAdmin && <EditButton />}
        </Datagrid>
      )}
    </List>
  )
}

export default RadioList
