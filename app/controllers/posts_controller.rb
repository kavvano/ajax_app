class PostsController < ApplicationController

  def index
    @posts = Post.all # 全てのレコードを@postに代入
  end

  def new
  end

  def create
    Post.create(content: params[:content])
  end

end
