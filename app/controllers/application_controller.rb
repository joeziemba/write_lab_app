class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  serialization_scope :view_context

  def home
    render 'static/home'
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up, keys: [
        :username,
        :first_name,
        :last_name,
        :bio
      ]
    )
  end
end
