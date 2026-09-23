CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

CREATE TABLE public.escala (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.escala TO anon;
GRANT SELECT, INSERT, UPDATE ON public.escala TO authenticated;
GRANT ALL ON public.escala TO service_role;
ALTER TABLE public.escala ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view the schedule" ON public.escala FOR SELECT USING (true);
CREATE POLICY "Admins can insert the schedule" ON public.escala FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update the schedule" ON public.escala FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.escala (data) VALUES ('{
  "month": "Julho",
  "year": "2026",
  "entries": [
    {
      "id": "e1",
      "date": "25/07",
      "day": "Sábado",
      "label": "Culto de Mulheres",
      "abertura": ["Balbina", "Elaine"],
      "orientadoraAbertura": "Estefany",
      "midia": "Bia",
      "fechamento": ["Cris", "Anita"],
      "orientadoraFechamento": "Presb. Cibele"
    }
  ],
  "observations": [
    "<strong>Dia 25/07 (Culto de Mulheres):</strong> Abertura com Balbina e Elaine | Fechamento com Cris e Anita",
    "<strong>Orientadoras:</strong> Estefany (abertura) e Presb. Cibele (fechamento)",
    "<strong>Chegada Antecipada:</strong> Toda a equipe de abertura deve chegar <strong>1 hora antes</strong> do horário de culto para organizar a mesa das bijus"
  ]
}'::jsonb);