from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .supabase_client import supabase


security = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(security)
):
    if credentials is None or credentials.scheme.lower() != 'bearer':
        print('Authorization header received:', bool(credentials))
        print('Bearer token received:', False)
        print('Bearer token length:', 0)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Missing or invalid bearer authentication token'
        )

    token = credentials.credentials
    print('Authorization header received:', bool(credentials))
    print('Bearer token received:', bool(token))
    print('Bearer token length:', len(token))

    try:
        response = supabase.auth.get_user(token)

        user = response.user

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired authentication token"
            )

        return user

    except HTTPException:
        raise
    except Exception as error:
        print('Supabase JWT validation error:', repr(error))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token"
        )