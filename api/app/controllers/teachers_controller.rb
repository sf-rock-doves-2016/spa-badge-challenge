class TeachersController < ApplicationController
  before_action :set_teacher, only: [:show, :update, :destroy]

  # GET /teachers
  # GET /teachers.json
  def index
    p request
    @teachers = Teacher.all

    render json: @teachers
  end

  # GET /teachers/1
  # GET /teachers/1.json
  def show
    render json: {name: @teacher.name, badges: @teacher.badges}
  end

  # POST /teachers
  # POST /teachers.json
  def create
    p request

    @teacher = Teacher.new(teacher_params)

    if @teacher.save
      render json: @teacher, status: :created, location: @teacher
    else
      render json: @teacher.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /teachers/1
  # PATCH/PUT /teachers/1.json
  def update
    @teacher = Teacher.find(params[:id])

    if @teacher.update(teacher_params)
      head :no_content
    else
      render json: @teacher.errors, status: :unprocessable_entity
    end
  end

  # DELETE /teachers/1
  # DELETE /teachers/1.json
  def destroy
    @teacher.destroy

    head :no_content
  end

  private

    def set_teacher
      @teacher = Teacher.find(params[:id])
    end

    def teacher_params
      params.require(:teacher).permit(:name)
    end
end
