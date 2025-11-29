import { DefaultPaging } from '@type/defaults';
import { Paging } from '@type/index';
import { AxiosResponse } from 'axios';
import { RefObject, useEffect, useRef, useState } from 'react';

type ApiFunctionType = (pageNo: number, pageSize: number, ...args: string[]) => Promise<AxiosResponse>;
type UsePagingDataHookR<T> = {
  scrollRef: RefObject<HTMLDivElement>;
  datas: T[];
  isLoading: boolean;
  paging: Paging;
  set_datas: React.Dispatch<React.SetStateAction<T[]>>;
};

/**
 * It's for any page needs to load paging datas.
 *
 * You have to pass apiFucntion which you declared in apis/index.ts
 *
 * The second parameter 'args' can take any value and it'll be passed to the apiFunction.
 * So if apiFunction needs more parameter except pageNo and pageSize, you can pass them as a second or more parameters in order.
 *
 * Returns:
 *
 * scrollRef: It must be registered as a ref of any div component which will behave like a scroll view.
 *
 * datas: paging datas
 *
 * isLoading: If paging data from the apiFunction is loading by scroll event, It'll be true. And it would be false if it's done.
 *
 * set_datas: If you needs to modify datas list, use this. It's the setter of paging data.
 *
 * paging: paging information e.g. current page, etc
 *
 * @param apiFucntion
 * @param ...args - string datas that apiFunction needs in order
 * @returns UsePagingDataHookR<T>
 */
export const usePagingData = <T>(apiFunction: ApiFunctionType, ...args: string[]): UsePagingDataHookR<T> => {
  const [paging, set_paging] = useState<Paging>(DefaultPaging);
  const [data, set_data] = useState<T[]>([]);
  const [isLoading, set_isLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData().then((res) => set_data(res));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.onscroll = onScroll;
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.onscroll = null;
      }
    };
  }, [paging, isLoading]);

  useEffect(() => {
    set_isLoading(false);
  }, [data]);

  const loadData = async (): Promise<T[]> => {
    if (paging.hasNext) {
      return apiFunction(paging.currentPage + 1, paging.pageSize, ...args)
        .then((res) => {
          set_paging({
            pageSize: res.data.pageSize,
            currentPage: res.data.pageNo,
            hasNext: res.data.pageNo < res.data.maxPage,
          });
          return <T[]>res.data.datas;
        })
        .catch((err) => {
          console.error("Error while fetching new Data in 'usePaingData' hook.");
          console.error(err);
          return <T[]>[];
        });
    }
    return Promise.resolve(<T[]>[]);
  };

  const onScroll = () => {
    if (isLoading) return;

    const maxScrollPos = scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight;
    const currentScrollPos = scrollRef.current!.scrollTop;
    if (maxScrollPos - currentScrollPos < 10) {
      set_isLoading(true); // prevent bouncing issue
      loadData()
        .then((res) => {
          set_data((prev) => [...prev, ...res]);
        })
        .catch((err) => console.log(err));
    }
  };

  return <UsePagingDataHookR<T>>{
    scrollRef: scrollRef,
    datas: data,
    isLoading: isLoading,
    paging: paging,
    set_datas: set_data,
  };
};
