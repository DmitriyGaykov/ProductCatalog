import {BlockUserBtn, EditUserBtn, LabelCheckBox, RemoveUserBtn, SearchInput, UnBlockBtn} from "../components";
import {useCallback, useEffect, useState} from "react";
import {useCurrentUser} from "../store";
import {Roles, User} from "../models";
import {Params} from "../types/params.ts";
import {useGetUsers} from "../hooks";
import {EntityTable, EntityTableProps} from "../features";
import {calcCountPages} from "../utils";

const USERS_LIMIT = 25;

export const UsersPage = () => {
  const [searchText, setSearchText] = useState("")
  const [onlyBlocked, setOnlyBlocked] = useState(false)
  const [page, setPage] = useState(1);

  const [blockable, setBlockable] = useState(true)

  const {
    users,
    countEntities,
    getUsers,
    refresh
  } = useGetUsers();

  const currentUser = useCurrentUser()!;

  const onSearchTextChanged = useCallback((value: string) => {
    setSearchText(value || "");
  }, [setSearchText]);

  const onApplied = () => {
    const params: Params = {
      q: searchText,
      blocked: onlyBlocked ? "1" : "0",
      limit: USERS_LIMIT
    }

    setBlockable(!onlyBlocked)

    getUsers(params).then();
  }
  const onPageChanged = useCallback((page: number) => {
    setPage(page);
  }, [setPage]);

  useEffect(() => {
    getUsers({page, limit: USERS_LIMIT}).then();
  }, [page])

  const tableOptions: EntityTableProps = {
    entities: users,
    row: {
      columns: [
        {
          dataField: (user: User) => user.firstName + " " + (user.lastName || ""),
        },
        {
          dataField: 'email'
        },
        {
          dataField: 'role'
        },
        {
          dataField: (user: User) => user.blocks?.[0]?.reason || "",
          hide: blockable
        },
        {
          dataField: (user: User) => (
            <div className="d-flex gap-1 align-items-center">
              <EditUserBtn user={user} onCompleted={refresh}/>
              {
                currentUser.id !== user.id &&
                  <>
                      <RemoveUserBtn userId={user.id} onRemove={refresh}/>
                    {
                      !user.blocks?.[0]?.id ?
                        <BlockUserBtn userId={user.id} onBlock={refresh}/> :
                        <UnBlockBtn blockId={user.blocks[0].id as string} onUnBlock={refresh}/>
                    }
                  </>
              }
            </div>
          )
        }
      ]
    },
    headers: [
      {
        label: "Имя и фамилия",
        className: "p-1"
      },
      {
        label: 'Эл. почта',
        className: "p-1"
      },
      {
        label: 'Роль',
        className: "p-1"
      },
      {
        label: 'Причина блокировки',
        className: 'p-1',
        hide: blockable,
        style: {
          wordWrap: "break-word",
          maxWidth: '600px'
        }
      },
      {
        label: '',
        className: 'border-0 p-1'
      }
    ],
    className: "mt-4",
    pagination: {
      countPages: calcCountPages(USERS_LIMIT, countEntities || 0),
      onPageChanged: onPageChanged,
      currentPage: page
    },
    style: {
      maxWidth: '1200px',
      width: '100%',
    }
  }

  return (
    <div
      className="d-flex flex-column min-vw-100 first-bg-color justify-content-start align-items-center page-height scroll-container">
      <div className="max-width-1500 w-100 mx-5 page-height d-flex flex-column p-2">
        <div className="w-100 d-flex gap-4 align-items-center">
          <SearchInput placeHolder="Поиск пользователя..." onValueChanged={onSearchTextChanged}/>

          {
            currentUser.role === Roles.Admin &&
              <LabelCheckBox label="Блокированные" onValueChanged={setOnlyBlocked}/>
          }

          <button className="btn btn-success" onClick={onApplied}>Применить</button>
        </div>
        <EntityTable {...tableOptions} />
      </div>
    </div>
  )
}