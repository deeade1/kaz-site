import graphene
from graphene import ObjectType, String, ID
from graphql import GraphQLError
from blog.models import Comment, Post
from .types import CommentNode, PostNode
import asyncio

class Subscription(ObjectType):
    comment_added = graphene.Field(CommentNode, post_id=graphene.ID(required=True))
    post_added = graphene.Field(PostNode, post_slug=graphene.ID(required=True))

    async def subscribe_comment_added(root, info, post_id):
        # Decode the post ID and retrieve the post
        _, post_pk = graphene.Node.from_global_id(post_id)
        try:
            post = Post.objects.get(pk=post_pk)
        except Post.DoesNotExist:
            raise GraphQLError("Post not found.")

        # Simulate real-time updates by polling the database for new comments
        last_comment_id = None
        while True:
            # Fetch the latest comment for the post
            new_comment = Comment.objects.filter(post=post).order_by("-id").first()

            # If a new comment is found, yield it
            if new_comment and new_comment.id != last_comment_id:
                last_comment_id = new_comment.id
                yield new_comment

            # Wait for a short period before checking again
            await asyncio.sleep(1)