FROM python:3.10-trixie

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install --no-install-recommends -y git ca-certificates graphviz graphviz-dev

RUN cd / && git clone https://github.com/jdevoo/emerge.git && cd emerge && pip install wheel && pip install -r requirements.txt

ENTRYPOINT ["python", "/emerge/emerge.py", "-c"]
