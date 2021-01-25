alter table "public"."users_preferences"
           add constraint "users_preferences_user_fkey"
           foreign key ("user")
           references "public"."users"
           ("id") on update restrict on delete restrict;
