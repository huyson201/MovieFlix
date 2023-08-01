
import React, { useEffect, useMemo } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import RequireAuth, { RequireAuthContent } from '../../components/RequireAuth/RequireAuth'
import withAuth from '../../HOC/withAuth'
import { AuthState } from '../../context/auth/auth.context'
import tmdbApi from '../../services/tmdbApi'
import authServices from '../../services/axiosBackend/auth/auth.services'
import { useQueries, useQuery } from '@tanstack/react-query'
import { DetailMovie, DetailTV } from '../../Types/Movie'
import FavoriteCard from '../../components/Card/FavoriteCard'
import SkeletonCard from '../../components/Skeleton/SkeletonCard'
import Pagination from '../../components/Pagination/Pagination'
import { useSearchParams } from 'react-router-dom'
import { MdVideoLibrary } from 'react-icons/md'

export interface FavoriteProps {

}

const Favorite = ({ auth }: FavoriteProps & { auth: AuthState | null }) => {

    const [searchParams, setSearchParams] = useSearchParams()

    const page = useMemo(() => {
        const page = parseInt(searchParams.get("page") || "1")
        return page
    }, [searchParams])

    const { data, isLoading } = useQuery({
        queryKey: ["favorites", { page }],
        queryFn: () => authServices.getFavorites({ page }),
        enabled: auth?.isLogged,
        keepPreviousData: true
    })

    const getListFavoritesDetail = useQueries({
        queries: !data ? [] : data.data.docs.map(favorite => {
            return {
                queryKey: ["favorite-detail", favorite.type, favorite.id],
                queryFn: async () => {
                    if (favorite.type === 'movie') {
                        const res = await tmdbApi.getDetail<DetailMovie>(favorite.type, +favorite.id)

                        return {
                            ...res.data,
                            mediaType: favorite.type
                        }
                    }

                    const res = await tmdbApi.getDetail<DetailTV>(favorite.type, +favorite.id)
                    return {
                        ...res.data,
                        mediaType: favorite.type
                    }

                },
                enabled: auth?.isLogged && data.data.docs.length > 0,
                keepPreviousData: true
            }
        })
    })



    return (
        <div className='pt-20 pb-12 bg-black-2'>
            <section className=' py-6 bg-black-2'>
                <Wrapper>
                    <h2 className='text-light-gray capitalize py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
                        Favorites
                    </h2>


                    {!auth?.isLogged && <RequireAuth content={<RequireAuthContent icon={<MdVideoLibrary />} title='Enjoy your favorite' description='Sign in to access your favorites that you’ve saved' />} />}

                    {auth?.isLogged && (
                        <>
                            <div className='grid gap-y-4 gap-x-4 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 lg:grid-cols-6 mt-8'>
                                {
                                    isLoading && new Array(14).fill(0).map((_, index) => {
                                        return (
                                            <SkeletonCard key={index.toString() + "all"} />
                                        )
                                    })
                                }
                                {getListFavoritesDetail.length > 0 && getListFavoritesDetail.map(query => {
                                    if (!query.data) return null;
                                    return <FavoriteCard data={query.data} mediaType={query.data?.mediaType} key={`${query.data?.mediaType}-${query.data?.id}`} />
                                })}

                                {
                                    data && data.data.docs.length === 0 && !isLoading && <p className='text-white font-medium col-span-full'>No items in the favorites list yet.</p>
                                }

                            </div>
                            {data && data.data.docs.length > 0 && <Pagination total={data.data.totalDoc} pageSize={20} defaultCurrent={1} className='mt-6 w-fully' />}
                        </>
                    )}

                </Wrapper>
            </section>
        </div>
    )
}

const WithAuthFavorite = withAuth(Favorite)
const FavoriteWrapper = () => {
    return <WithAuthFavorite />
}
export default FavoriteWrapper