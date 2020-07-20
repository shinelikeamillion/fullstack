import React from 'react'
import { useFild } from '../hooks/hooks'
import { addComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Accordion, Card, ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap'

const CommentForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const matcher = useRouteMatch('/blogs/:id')
  const comment = useFild('comment')
  return user
    ?<div>
      <InputGroup>
        <FormControl placeholder='leave a comment here' {...comment}/>
        <Button onClick={(e) => {dispatch(addComment(matcher.params.id, { content: comment.value }))}}>add comment</Button>
      </InputGroup>
    </div>
    : null
}

export const Comments = ({ comments }) => {
  return <Accordion defaultActiveKey='0'>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey='0'>comments</Accordion.Toggle>
      <Accordion.Collapse eventKey='0'>
        <div>
          <CommentForm/>
          <ListGroup>
            {comments.map(comment => <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>)}
          </ListGroup>
        </div>
      </Accordion.Collapse>
    </Card>
  </Accordion>
}