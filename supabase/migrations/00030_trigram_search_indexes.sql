-- Performance optimization: trigram indexes for text search
-- Enables efficient LIKE '%query%' searches on name columns
-- Current app uses prefix search (query%), but this supports future middle-of-word search

-- Enable pg_trgm extension (safe to run multiple times)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN trigram index on products.name for product search
CREATE INDEX IF NOT EXISTS idx_products_name_trgm
  ON public.products USING gin (name gin_trgm_ops);

-- GIN trigram index on clients.name for client search
CREATE INDEX IF NOT EXISTS idx_clients_name_trgm
  ON public.clients USING gin (name gin_trgm_ops);
