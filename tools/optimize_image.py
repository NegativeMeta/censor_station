"""Compatibility entry point. The optimizer now lives in ``tools.python``."""

from python.optimizer import optimize
from python.protocol import serve


if __name__ == "__main__":
    serve(optimize)
