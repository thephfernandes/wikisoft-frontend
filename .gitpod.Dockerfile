FROM gitpod/workspace-postgres

# Install Redis
RUN brew install redis

# Install UpCloud CLI
RUN brew tap UpCloudLtd/tap
RUN brew install upcloud-cli

# Install Github CLI
RUN brew install gh