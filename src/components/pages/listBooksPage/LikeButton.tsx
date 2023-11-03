import { PropsWithChildren, useEffect, useState } from 'react'
import Book from '../../../interfaces/book.interface'
import {
  fetchAddFavorite,
  fetchDeleteFavorite,
  fetchFavoriteCountForBook,
  fetchisBookFavoritedByUser,
} from '../../../fetchFunctions'
import { listBooksLikeButton, listBooksLikeButtonGrid } from '../../../sxStyles'
import { Button } from '@mui/material'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@mui/icons-material'

type Props = PropsWithChildren<{ book: Book; viewType: string }>

export default function LikeButton(props: Props): JSX.Element {
  const { book, viewType } = props
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    checkLikeStatus()
    updateLikeCount()
  }, [book.id])

  const checkLikeStatus = async () => {
    try {
      await fetchisBookFavoritedByUser(book.id).then((data) => {
        setIsLiked(data.isFavorited)
      })
    } catch (error) {
      console.error('Error checking liked status:', error)
    }
  }

  const updateLikeCount = async () => {
    try {
      await fetchFavoriteCountForBook(book.id).then((data) => {
        setLikeCount(data.count)
      })
    } catch (error) {
      console.error('Error updating liked count:', error)
    }
  }

  const handleLikeButtonClick = async () => {
    try {
      if (isLiked) {
        await fetchDeleteFavorite(book.id)
      } else {
        await fetchAddFavorite(book.id)
      }
      setIsLiked(!isLiked)
      updateLikeCount()
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <Button
      sx={viewType === 'list' ? listBooksLikeButton : listBooksLikeButtonGrid}
      variant="text"
      onClick={handleLikeButtonClick}
      startIcon={isLiked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
    >
      {likeCount}
    </Button>
  )
}
