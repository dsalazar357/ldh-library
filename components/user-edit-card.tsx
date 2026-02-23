"use client";

import { useActionState, useState } from "react";
import { updateUserAction, changePasswordAction, toggleUserActiveAction } from "@/app/actions/users";
import { DEGREES } from "@/lib/constants";

type User = {
  id: number;
  email: string;
  username: string | null;
  degree: number;
  admin: boolean;
  active: boolean;
};

interface UserEditCardDict {
  noUsername: string;
  admin: string;
  username: string;
  email: string;
  degree: string;
  adminPrivileges: string;
  changePassword: string;
  cancelPasswordChange: string;
  setNewPassword: string;
  newPassword: string;
  confirmPassword: string;
  newPasswordPlaceholder: string;
  confirmPasswordPlaceholder: string;
  updatePassword: string;
    updatingPassword: string;
    active: string;
    inactive: string;
    enable: string;
    disable: string;
    enabling: string;
    disabling: string;
  }

interface UserEditCardProps {
  user: User;
  dict: UserEditCardDict;
  commonDict: {
    save: string;
    saving: string;
  };
}

export default function UserEditCard({ user, dict, commonDict }: UserEditCardProps) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [updateState, updateAction, isUpdating] = useActionState(
    updateUserAction,
    null
  );
  const [passwordState, passwordAction, isChangingPassword] = useActionState(
    changePasswordAction,
    null
  );
  const [toggleState, toggleAction, isToggling] = useActionState(
    toggleUserActiveAction,
    null
  );

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            {(user.username || user.email)[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-card-foreground font-sans">
              {user.username || dict.noUsername}
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!user.active && (
            <span className="text-xs font-medium bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">
              {dict.inactive}
            </span>
          )}
          {user.admin && (
            <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {dict.admin}
            </span>
          )}
        </div>
      </div>

      <form action={updateAction} className="px-5 py-4 flex flex-col gap-4">
        <input type="hidden" name="userId" value={user.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`username-${user.id}`}
              className="text-xs font-medium text-muted-foreground"
            >
              {dict.username}
            </label>
            <input
              id={`username-${user.id}`}
              name="username"
              type="text"
              defaultValue={user.username || ""}
              required
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`email-${user.id}`}
              className="text-xs font-medium text-muted-foreground"
            >
              {dict.email}
            </label>
            <input
              id={`email-${user.id}`}
              name="email"
              type="email"
              defaultValue={user.email}
              required
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={`degree-${user.id}`}
              className="text-xs font-medium text-muted-foreground"
            >
              {dict.degree}
            </label>
            <select
              id={`degree-${user.id}`}
              name="degree"
              required
              defaultValue={user.degree}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            >
              {DEGREES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-3 pb-0.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="admin"
                type="checkbox"
                defaultChecked={user.admin}
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring accent-primary"
              />
              <span className="text-sm text-card-foreground">{dict.adminPrivileges}</span>
            </label>
          </div>
        </div>

        {updateState?.error && (
          <p className="text-sm text-destructive font-medium" role="alert">
            {updateState.error}
          </p>
        )}
        {updateState?.success && (
          <p className="text-sm text-green-700 font-medium" role="status">
            {updateState.success}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isUpdating}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? commonDict.saving : commonDict.save}
          </button>
          <button
            type="button"
            onClick={() => setShowPasswordForm((prev) => !prev)}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {showPasswordForm ? dict.cancelPasswordChange : dict.changePassword}
          </button>
        </div>
      </form>

      {/* Enable/Disable toggle */}
      <form action={toggleAction} className="px-5 py-3 border-t border-border flex items-center justify-between">
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="active" value={user.active ? "false" : "true"} />
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 rounded-full ${user.active ? "bg-green-500" : "bg-destructive"}`} aria-hidden="true" />
          <span className="text-sm text-muted-foreground">
            {user.active ? dict.active : dict.inactive}
          </span>
        </div>
        {toggleState?.error && (
          <p className="text-xs text-destructive font-medium" role="alert">
            {toggleState.error}
          </p>
        )}
        <button
          type="submit"
          disabled={isToggling}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            user.active
              ? "bg-destructive text-destructive-foreground hover:opacity-90"
              : "bg-green-600 text-white hover:opacity-90"
          }`}
        >
          {isToggling
            ? user.active
              ? dict.disabling
              : dict.enabling
            : user.active
              ? dict.disable
              : dict.enable}
        </button>
      </form>

      {showPasswordForm && (
        <form
          action={passwordAction}
          className="px-5 py-4 border-t border-border flex flex-col gap-4 bg-muted/30"
        >
          <input type="hidden" name="userId" value={user.id} />
          <p className="text-sm font-medium text-card-foreground">
            {dict.setNewPassword}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`newPassword-${user.id}`}
                className="text-xs font-medium text-muted-foreground"
              >
                {dict.newPassword}
              </label>
              <input
                id={`newPassword-${user.id}`}
                name="newPassword"
                type="password"
                required
                minLength={6}
                placeholder={dict.newPasswordPlaceholder}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`confirmPassword-${user.id}`}
                className="text-xs font-medium text-muted-foreground"
              >
                {dict.confirmPassword}
              </label>
              <input
                id={`confirmPassword-${user.id}`}
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                placeholder={dict.confirmPasswordPlaceholder}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
          </div>

          {passwordState?.error && (
            <p className="text-sm text-destructive font-medium" role="alert">
              {passwordState.error}
            </p>
          )}
          {passwordState?.success && (
            <p className="text-sm text-green-700 font-medium" role="status">
              {passwordState.success}
            </p>
          )}

          <button
            type="submit"
            disabled={isChangingPassword}
            className="self-start rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChangingPassword ? dict.updatingPassword : dict.updatePassword}
          </button>
        </form>
      )}
    </div>
  );
}
