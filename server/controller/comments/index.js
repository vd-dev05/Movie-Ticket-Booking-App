import { createComment } from "./user/index.js"

const CommentController = {
    createComment: async (req, res) => {
      try {
            const userId = req.params.id
            const movieBody = req.body
            const r = await createComment( userId,movieBody)
            res.status(201).json({
              success: true,
              message: 'Comment created successfully!',
              data: r
            })
      } catch (error) {
       res.status(404).json({
         success: false,
         message: error.message,
         data: null
       })
      }
    }
}

export default CommentController