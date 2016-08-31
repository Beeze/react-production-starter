import React, { PropTypes } from 'react'
import { registerAsyncActions } from 'redux-taxi'
import { loadPosts } from '../actions'
import { connect } from 'react-redux'
import PostListItem from '../components/PostListItem'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { selectPosts } from '../reducer'
import GitHub from './GitHub'

const mapStateToProps = state => ({
  posts: selectPosts(state)
})

class PostListPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.props.loadPosts()
  }

  render () {
    const { posts } = this.props
    return (
      <div className={css(styles.root)}>
        <Helmet title='Posts' />
        {posts.isLoading &&
          <div>
            <h2 className={css(styles.title)}>Loading....</h2>
          </div>}
        {!posts.isLoading &&
          posts.data.map((post, i) => <PostListItem key={post.id} post={post} />)}
        <GitHub />
      </div>
    )
  }
}

PostListPage.PropTypes = {
  posts: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
})

export default registerAsyncActions('LOAD_POSTS')(connect(mapStateToProps, {loadPosts})(PostListPage))
