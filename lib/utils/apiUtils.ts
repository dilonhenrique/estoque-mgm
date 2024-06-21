import { NextResponse } from "next/server";

const OK = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const METHOD_NOT_ALLOWED = 405;
const CONFLICT = 409;

export const nextResponses = {
  ok200<T>(data: T) {
    return NextResponse.json({ data }, { status: OK });
  },

  notFound404(message?: string) {
    return NextResponse.json(
      { error: message || "Not found" },
      { status: NOT_FOUND }
    );
  },

  methodNotAllowed405(message?: string) {
    return NextResponse.json(
      { error: message || "Method not allowed" },
      { status: METHOD_NOT_ALLOWED }
    );
  },

  badRequest400(message?: string) {
    return NextResponse.json(
      { error: message || "Bad request" },
      { status: BAD_REQUEST }
    );
  },

  internalError500(message?: string) {
    return NextResponse.json(
      { error: message || "Internal server error" },
      { status: INTERNAL_SERVER_ERROR }
    );
  },

  unauthorized401(message?: string) {
    return NextResponse.json(
      { error: message || "Unauthorized" },
      { status: UNAUTHORIZED }
    );
  },

  forbidden403(message?: string) {
    return NextResponse.json(
      { error: message || "Forbidden" },
      { status: FORBIDDEN }
    );
  },

  conflict409(message?: string) {
    return NextResponse.json(
      { error: message || "Conflict" },
      { status: CONFLICT }
    );
  },
};

export function or404<T>(data: T): void | T {
  if (!data) throw nextResponses.notFound404();
  return data;
}

export function or403(condition: boolean, message?: string): void | boolean {
  if (!condition) throw nextResponses.forbidden403(message);
  return condition;
}
