import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction, setSortBy } from 'store/slices/posts'

const sortList = [
  { name: 'Старые', sort: 'created' },
  { name: 'Новые', sort: '-created' },
  { name: 'По рейтингу ( по возрастанию )', sort: 'likes' },
  { name: 'По рейтингу ( по убыванию )', sort: '-likes' },
]

const Sort = () => {
  const { sortType } = useSelector(s => s.Posts)
  const dispatch = useDispatch()
  const onSort = (obj) => {
    dispatch(setSortBy(obj))
    dispatch(getPostsAction({ sortBy: obj.sort, perPage: 15 }))
  }

  return (
    <div className="absolute z-20">
      <Menu>
        <MenuButton>
          <div className="ml-5 border-[1px] border-grey-100 bg-white rounded-lg px-2 py-1 flex items-center">{sortType.name} <FiChevronDown className="ml-[10px]" /></div>


        </MenuButton>
        <MenuList className="ml-5">
          {
            sortList?.map((item, index) => <div key={index}>
              <MenuItem onClick={() => onSort(item)}>{item.name}</MenuItem>
            </div>)
          }
        </MenuList>
      </Menu>

    </div>
  )
}

export default Sort