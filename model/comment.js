
Class Comment {

  constructor(db) {
    this.db = db;
  }

  createComment(comment_body, post_id, user_id) {
    return this.db.one({
      text: 'INSERT INTO post_comments (comment_body, post_id, user_id)',
      values: [comment_body, post_id, user_id]
    })
  }

  findCommentsByPostId(post_id) {
    return this.db.any({
      text: 'SELECT * FROM post_comments WHERE post_id = $1',
      values: [post_id]
    })
  }

}

module.exports = new Comment(db);