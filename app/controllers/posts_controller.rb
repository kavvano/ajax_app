class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC") # 全てのレコードを@postに代入
  end

  # def new
  # end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

end
