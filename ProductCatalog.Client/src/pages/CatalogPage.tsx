import {FC, useCallback, useEffect, useState} from "react";
import {CatalogFilters, EntityTable, EntityTableProps, SortingTypes} from "../features";
import {Category, Product, Roles} from "../models";
import {useGetProducts} from "../hooks";
import {useCurrentUser} from "../store";
import {calcCountPages} from "../utils";
import {AddProductBtn, EditProductBtn, RemoveProductBtn} from "../components";
import {useParams} from "react-router-dom";

const PRODUCTS_LIMIT = 25;

export const CatalogPage: FC = () => {
  const {categoryId} = useParams();

  const {
    products,
    countEntities,
    params,
    getProducts,
    add,
    edit,
    remove
  } = useGetProducts();

  const currentUser = useCurrentUser()!;

  const [page, setPage] = useState(0);

  const [categories, setCategories] = useState<Category[]>([])

  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(1_000_000);
  const [searchText, setSearchText] = useState('');
  const [userSearchText, setUserSearchText] = useState("");

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortByType, setSortByType] = useState<'asc' | 'desc'>("asc")

  const onSortedTypesChanged = useCallback((type: SortingTypes) => {
    switch (type) {
      case SortingTypes.Cheap:
        setSortBy('price')
        setSortByType('asc')
        break;
      case SortingTypes.Expensive:
        setSortBy('price')
        setSortByType('desc')
        break;
      default:
        setSortBy(null)
        setSortByType('asc')
        break;
    }
  }, [setSortBy, setSortByType])

  const onFilterApplied = () => {
    getProducts({
      categoryId,
      priceFrom,
      priceTo,
      q: searchText,
      sortBy,
      orderType: sortByType,
      uq: userSearchText,
      limit: PRODUCTS_LIMIT,
      page
    }).then()
  };

  const onCategoryRemove = useCallback((category: Category) => {
    const _products = products
      .filter(p => p.categoryId === category.id);

    remove(..._products);
  }, [products, remove])

  const productsTableOptions: EntityTableProps = {
    entities: products,
    headers: [
      {
        label: 'Наименование продукта',
        className: 'height-60'
      },
      {
        label: 'Категория',
        className: 'height-60'
      },
      {
        label: 'Пользователь',
        className: 'height-60'
      },
      {
        label: 'Описание',
        className: 'height-60'
      },
      {
        label: 'Стоимость в рублях',
        className: 'height-60'
      },
      {
        label: 'Примечание общее',
        className: 'height-60'
      },
      {
        label: 'Примечание специальное',
        hide: currentUser.role === Roles.User,
        className: 'height-60'
      },
      {
        label: 'Действие',
        className: 'height-60',
        hide: currentUser.role === Roles.Admin
      }
    ],
    row: {
      columns: [
        {
          dataField: 'name',
        },
        {
          dataField: (product: Product) => product.category?.name || "",
        },
        {
          dataField: (product: Product) => product.user?.firstName + " " + (product.user?.lastName || ""),
        },
        {
          dataField: 'description',
        },
        {
          dataField: 'price',
        },
        {
          dataField: 'notes',
        },
        {
          dataField: 'specialNotes',
          hide: currentUser.role === Roles.User
        },
        {
          dataField: (product: Product) => (
            <>
              {
                currentUser.role !== Roles.Admin && currentUser.id === product.userId &&
                  <EditProductBtn product={product} categories={categories} onCompleted={edit}/>
              },
              {
                (
                  currentUser.role === Roles.AdvancedUser && (
                    product.userId === currentUser.id ||
                    product.user?.role === Roles.User
                  )
                ) &&
                  <RemoveProductBtn product={product} onRemove={remove}/>
              }
            </>
          ),
          hide: currentUser.role === Roles.Admin
        }
      ]
    },
    pagination: {
      countPages: calcCountPages(PRODUCTS_LIMIT, countEntities || 0),
      currentPage: page,
      onPageChanged: setPage
    }
  }

  useEffect(() => {
    getProducts({
      limit: PRODUCTS_LIMIT,
      categoryId
    }).then();
  }, [categoryId])

  useEffect(() => {
    if (page && params.page !== page) {
      getProducts({
        ...params,
        page,
      }).then()
    }
  }, [page]);

  return (
    <div className="d-flex justify-content-center min-vw-100 first-bg-color page-height">
      <div className="max-width-1500 width-1500 d-flex flex-column gap-3 scroll-container mx-5">
        <CatalogFilters onPriceFromChanged={setPriceFrom}
                        onPriceToChanged={setPriceTo} onSearchTextChanged={setSearchText}
                        onUserSearchTextChanged={setUserSearchText}
                        onCategories={setCategories}
                        onApplied={onFilterApplied} onSortingTypeChanged={onSortedTypesChanged}
                        onCategoryRemove={onCategoryRemove}
        />

        {
          [Roles.User, Roles.AdvancedUser].includes(currentUser.role) &&
            <AddProductBtn categories={categories} onComplete={add}/>
        }

        <EntityTable {...productsTableOptions} />
      </div>
    </div>
  )
}